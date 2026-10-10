final: prev: {
  aws-sam-cli = prev.aws-sam-cli.overrideAttrs (old: {
    version = "1.168.0";
    src = prev.fetchFromGitHub {
      owner = "aws";
      repo = "aws-sam-cli";
      tag = "v1.168.0";
      hash = "sha256-MYzOJskAGzwFx3zIXshBfsTpuQAf4alCoQfJRsEAn9w=";
    };
    disabledTests = old.disabledTests or [ ] ++ [
      "test_lint_sam_resource_types"
      "test_samconfig"
    ];
  });
}
