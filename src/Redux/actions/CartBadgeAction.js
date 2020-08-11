export const increment = () => {
  return {
    type: "increase",
  };
};

export const decrement = () => {
  return {
    type: "decrease",
  };
};

export const zero = () => {
  return {
    type: "zero",
  };
};
export const set = (value) => {
  return {
    type: "set",
    payload: value,
  };
};
