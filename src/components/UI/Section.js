import classes from "./Section.module.css";

const Section = ({ children }) => {
  return <div className={classes.section}>{children}</div>;
};

export default Section;
