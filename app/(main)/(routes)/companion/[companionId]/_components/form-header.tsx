interface FormHeaderProps {
  label: string;
  desc: string;
}

export const FormHeader = ({ label, desc }: FormHeaderProps) => {
  return (
     <div className="border-b-[1px] border-primary/10 pb-2">
      <h1 className="text-lg font-[500]">{label}</h1>
      <span className="text-sm text-muted-foreground">
        {desc}
      </span>
      </div>
  );
};
