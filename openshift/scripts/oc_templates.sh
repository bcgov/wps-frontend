#!/bin/sh -l
#
source "$(dirname ${0})/common/common"

#%
#% OpenShift Build Helper
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

# Target project override for TEST or PROD first deployments
#
PROJ_TARGET="${PROJ_TARGET:-${PROJ_DEV}}"


# Process templates (mostly variable substition)
#
OC_PROCESS_BC="oc -n ${PROJ_TOOLS} process -f ${PATH_BC} -p NAME=${NAME_APP} -p SUFFIX=${SUFFIX} -p GIT_BRANCH=${GIT_BRANCH}"
OC_PROCESS_DC="oc -n ${PROJ_TOOLS} process -f ${PATH_DC} -p NAME=${NAME_APP} -p SUFFIX=${SUFFIX}"

# Apply templates (apply or use --dry-run)
#
OC_APPLY_BC="oc -n ${PROJ_TOOLS} apply -f -"
OC_APPLY_DC="oc -n ${PROJ_TARGET} apply -f -"
if [ ! "${APPLY}" ]; then
  OC_APPLY_BC="${OC_APPLY_BC} --dry-run"
  OC_APPLY_DC="${OC_APPLY_DC} --dry-run"
fi


# Execute commands
#
eval "${OC_PROCESS_BC}"
eval "${OC_PROCESS_DC}"
eval "${OC_PROCESS_BC} | ${OC_APPLY_BC}"
eval "${OC_PROCESS_DC} | ${OC_APPLY_DC}"

# Provide oc command instruction
#
display_helper "${OC_PROCESS_BC} | ${OC_APPLY_BC}" "${OC_PROCESS_DC} | ${OC_APPLY_DC}"
