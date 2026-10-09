# { config, pkgs, ... }:
{
  settings.processes.npm-ci = {
    command = ''
      npm ci --include dev
    '';
  };
  settings.processes.barneydev = {
    command = ''
      cd packages/barneydev
      npm run dev
    '';
    depends_on = {
      npm-ci = {
        condition = "process_completed";
      };
    };
  };
}
