export const ServiceSettingsTitle = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-sm mb-1 ml-4">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
