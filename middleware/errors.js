exports.notFound = (req, res, next) => {
  res.status(404).render("errorPage");
};

exports.serverError = (err, req, res, next) => {
  console.error(err);
  res.status(500).render("errorPage");
};
