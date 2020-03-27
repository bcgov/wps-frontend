#!/bin/sh -l
#
source "$(dirname ${0})/common/common"

#%
#% OpenShift Deploy Helper
#%
#%   Intended for use with a pull request-based pipeline.
#%   Suffixes incl.: pr-###, test and prod.
#%
#% Usage:
#%
#%   ${THIS_FILE} [SUFFIX] [apply]
#%
#% Examples:
#%
#%   Provide a PR number. Defaults to a dry-run.
#%   ${THIS_FILE} pr-0
#%
#%   Apply when satisfied.
#%   ${THIS_FILE} pr-0 apply
#%

# Target project override for Dev or Prod deployments
#
PROJ_TARGET="${PROJ_TARGET:-${PROJ_DEV}}"

OC_DEPLOY="oc -n ${PROJ_TARGET} rollout latest dc/${NAME_OBJ}"
OC_LOG="oc -n ${PROJ_TARGET} logs -f dc/${NAME_OBJ}"

if [ ! "${APPLY}" ]; then
  OC_DEPLOY="${OC_DEPLOY} --dry-run"
  OC_LOG=""
fi

eval "${OC_DEPLOY}"
eval "${OC_LOG}"

# Provide oc command instruction
#
display_helper "${OC_DEPLOY}" "${OC_LOG}"
