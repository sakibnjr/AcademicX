const generateSemesterList = () => {
  const semesters = [];

  for (let year = 2015; year <= 2025; year++) {
    const yearSuffix = year.toString().slice(-2); // Get last two digits of the year

    // Spring semester
    semesters.push({ id: `${yearSuffix}1`, name: `Spring ${year}` });

    // Summer semester
    semesters.push({ id: `${yearSuffix}2`, name: `Summer ${year}` });

    // Fall semester
    semesters.push({ id: `${yearSuffix}3`, name: `Fall ${year}` });
  }

  return semesters;
};

export default generateSemesterList;
