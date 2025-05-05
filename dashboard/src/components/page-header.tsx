


export const PageHeader = ({ title, description, children }: { title: string, description: string, children?: React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">
                {description}
            </p>
        </div>
        {children}
    </div>
)