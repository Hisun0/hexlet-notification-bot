export default (arr1, arr2) => {
  const result = {};

  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];

    const differences = {};

    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        differences[key] = obj2[key];
      }
    }

    if (Object.keys(differences).length > 0) {
      result[i] = differences;
    }
  }

  return result;
};
