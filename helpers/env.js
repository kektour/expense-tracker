exports.getEnvVar = function(name) {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Process env var missing: ${name}`);
  }

  return val;
};
