import { Link } from "react-router-dom";
export default function TButton({
  color = "indigo",
  to = "",
  link = false,
  circle = false,
  target = "_blank",
  href = "",
  children
}) {
  let classes = [
    "flex",
    "whitespace-nowwrap",
    "text-sm",
    "border",
    "border-2",
    "border-transparent",
  ];

  if (link) {
    classes = [...classes, "transition-colors"];
    switch (color) {
      case "indigo":
        classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
        break;
      case "red":
        classes = [...classes, "text-red-500", "focus:border-red-500"];
        break;
    }
  } else {
    classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"];

    switch (color) {
      case "indigo":
        classes = [
          ...classes,
          "bg-indigo-600",
          "hover:bg-indigo-600",
          "focus:ring-indigo-500",
        ];
        break;
      case "red":
        classes = [
          ...classes,
          "bg-red-600",
          "hover:bg-red-600",
          "focus:ring-red-500",
        ];
        break;
      case "green":
        classes = [
          ...classes,
          "bg-emerald-600",
          "hover:bg-emerald-600",
          "focus:ring-emerald-500",
        ];
        break;
    }
  }

  if (circle) {
    classes = [
      ...classes,
      "h-8",
      "w-8",
      "rounded-full",
      "text-sm",
      "items-center",
      "justify-center",
    ];
  } else {
    classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
  }
  return (
    <>
      {href && (
        <a href={href} target={target} className={classes.join(" ")}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button className={classes.join(" ")}>{children}</button>
      )}
    </>
  );
}
