#!/bin/bash

OS_TYPE=$(uname -s | tr '[:upper:]' '[:lower:]')

# Detect OS distribution properly
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS_DISTRO=$ID
elif [ -f /etc/redhat-release ]; then
    OS_DISTRO=$(cat /etc/redhat-release | tr '[:upper:]' '[:lower:]' | sed 's/^\([a-z]*\).*/\1/')
elif [ -f /etc/debian_version ]; then
    OS_DISTRO="debian"
elif [ -f /etc/alpine-release ]; then
    OS_DISTRO="alpine"
else
    OS_DISTRO="unknown"
fi

case "$OS_DISTRO" in
arch | ubuntu | debian | raspbian | centos | fedora | rhel | ol | rocky | sles | opensuse-leap | opensuse-tumbleweed | almalinux | amzn | alpine) ;;
*)
    echo "This script only supports Debian, Redhat, Arch Linux, Alpine Linux, or SLES based operating systems for now."
    echo "Detected OS: $OS_DISTRO"
    exit 1
    ;;
esac

echo "Installing K3s..."
curl -sfL https://get.k3s.io | sh -

echo "Waiting for K3s to be ready..."
sleep 5

echo "Installing cert-manager..."
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.18.0/cert-manager.yaml

echo "Copy .env file from .env.example..."
cp .env.example .env


MACHINE_IP=$(hostname -I | awk '{print $1}')
echo "Setting NEXT_PUBLIC_API_URL to machine IP: $MACHINE_IP"
sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=$MACHINE_IP|" .env

echo "Generating secure PostgreSQL credentials..."
POSTGRES_USER="user_$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)"
POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/")

echo "Setting POSTGRES_USER to: $POSTGRES_USER"
echo "Setting POSTGRES_PASSWORD to: $POSTGRES_PASSWORD"

sed -i "s|POSTGRES_USER=.*|POSTGRES_USER=$POSTGRES_USER|" .env
sed -i "s|POSTGRES_PASSWORD=.*|POSTGRES_PASSWORD=$POSTGRES_PASSWORD|" .env

echo "Creating ConfigMap from .env file..."
if [ -f ".env" ]; then
    echo "Creating ConfigMap from .env file..."
    
    cat > /tmp/configmap.yaml << 'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
data:
EOF
    while IFS='=' read -r key value || [ -n "$key" ]; do
        if [[ -n "$key" && ! "$key" =~ ^[[:space:]]*# ]]; then
            key=$(echo "$key" | xargs)
            value=$(echo "$value" | xargs)
            
            if [[ -n "$key" ]]; then
                echo "  $key: \"$value\"" >> /tmp/configmap.yaml
            fi
        fi
    done < .env
    
    kubectl apply -f /tmp/configmap.yaml
    
    rm /tmp/configmap.yaml
    
    echo "ConfigMap 'app-config' created successfully from .env file"
else
    echo "No .env file found. Skipping ConfigMap creation."
fi

echo "Creating PostgreSQL Secret from .env file..."
if [ -f ".env" ]; then
    POSTGRES_USER=$(grep "^POSTGRES_USER=" .env | cut -d'=' -f2 | tr -d '"' | tr -d "'")
    POSTGRES_PASSWORD=$(grep "^POSTGRES_PASSWORD=" .env | cut -d'=' -f2 | tr -d '"' | tr -d "'")
    
    if [[ -n "$POSTGRES_USER" && -n "$POSTGRES_PASSWORD" ]]; then
        POSTGRES_USER_B64=$(echo -n "$POSTGRES_USER" | base64)
        POSTGRES_PASSWORD_B64=$(echo -n "$POSTGRES_PASSWORD" | base64)
        
        cat > /tmp/postgres-secret.yaml << EOF
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secret
  namespace: default
type: Opaque
data:
  username: $POSTGRES_USER_B64
  password: $POSTGRES_PASSWORD_B64
EOF
        
        kubectl apply -f /tmp/postgres-secret.yaml
        rm /tmp/postgres-secret.yaml
        echo "PostgreSQL Secret 'postgres-secret' created successfully from .env file"
    else
        echo "Error: POSTGRES_USER or POSTGRES_PASSWORD not found in .env file"
        exit 1
    fi
else
    echo "Error: .env file not found. Cannot create PostgreSQL Secret."
    exit 1
fi

echo "Applying configs..."
kubectl apply -f configs/prod.yaml
echo "Configs applied successfully"

echo "Bootstrap complete, please wait for the services to be ready..."

echo "You can access the dashboard at http://$MACHINE_IP"