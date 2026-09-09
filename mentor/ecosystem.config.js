module.exports = {
  apps: [
    {
      name: "mentorship",
      cwd: "/home/webprod/apps/mentorship/mentorship/mentor",
      script: "npm",
      args: "start",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3060
      }
    }
  ]
};