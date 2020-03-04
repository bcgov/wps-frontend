#!/bin/bash
#
source "$(dirname ${0})/common/common"

#%
#% OpenShift Deploy Helper
#%
#%   Intended for use with a pull request-based pipeline.
#%
#% Usage:
#%
#%   ${THIS_FILE} [PR_NUMBER] [apply]
#%
#% Examples:
#%
#%   Provide a PR number. Defaults to a dry-run.
#%   ${THIS_FILE} 0
#%
#%   Apply when satisfied.
#%   ${THIS_FILE} 0 apply
#%

# OpenShift commands
#
OC_PROCESS="oc -n ${PROJ_TOOLS} process -f ${PATH_DC} -p NAME=${NAME} -p SUFFIX=pr-${PR_NO}"
OC_APPLY="oc -n ${PROJ_DEV} apply -f -"
OC_COMMAND="${OC_PROCESS} | ${OC_APPLY}"
#
[ "${APPLY}" ] ||
	OC_COMMAND+=" --dry-run"
eval "${OC_PROCESS}"
eval "${OC_COMMAND}"

# Provide oc command instruction
#
informer "${OC_COMMAND}"
