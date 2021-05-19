const Button = ({ title, warning, children, ...rest }) => (
  <button
    className={` hover:text-white focus:outline-none my-2 border-2 border-accent-700 dark:border-daccent-700 stroke-currentw-full font-bold  px-5 py-1 rounded-2xl  ${
      warning
        ? "hover:bg-warning-default hover:border-warning-default active:bg-warning-dark active:border-warning-dark"
        : "hover:bg-success-default hover:border-success-default active:bg-success-dark active:border-success-dark"
    }`}
    {...rest}
  >
    {title}
  </button>
);

export default Button;
