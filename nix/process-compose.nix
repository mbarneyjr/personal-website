{ inputs, ... }:
{
  imports = [ inputs.process-compose-flake.flakeModule ];
  perSystem = {
    process-compose.dev = {
      imports = [ inputs.services-flake.processComposeModules.default ];
      settings.processes.npm-ci = {
        command = "npm ci --include dev";
      };
      settings.processes.site = {
        command = ''
          cd packages/site
          npm run hmr
        '';
        depends_on.npm-ci.condition = "process_completed";
      };
    };
  };
}
