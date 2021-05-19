const Form = ({ children, ...rest }) => (
  <form className=" w-full flex flex-col" {...rest}>
    {children}
  </form>
);

export default Form;
