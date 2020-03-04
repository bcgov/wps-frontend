#!/bin/bash
#
source "$(dirname ${0})/common/common"

#%
#% OpenShift Cleanup Helper
#%
#%   Intended for use with a pull request-based pipeline.
#%
#% Usage:
#%
#%   ${THIS_FILE} [PR_NUMBER] [apply]
#%
#% Examples:
#%
#%   Provide a PR number. Default only returns object names.
#%   ${THIS_FILE} 0
#%
#%   Apply when satisfied.
#%   ${THIS_FILE} 0 apply
#%
#%   Override variables at runtime.
#%   PROJ_TOOLS=tools PROJ_DEV=dev ${THIS_FILE} 0 apply
#%

# Set and process commands
#
APP_LABEL="${NAME}-pr-${PR_NO}"
if [ "${APPLY}" ]; then
	OC_CLEAN_DEPLOY="oc -n ${PROJ_DEV} delete all -o name -l app=${APP_LABEL}"
	OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} delete all -o name -l app=${APP_LABEL}"
else
	OC_CLEAN_DEPLOY="oc -n ${PROJ_DEV} get all -o name -l app=${APP_LABEL}"
	OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} get all -o name -l app=${APP_LABEL}"
	echo -e "\n*** This only a listing.  Use 'apply' to delete. ***"
fi
echo -e "\n${PROJ_DEV}:"
eval "${OC_CLEAN_DEPLOY}"
echo -e "\n${PROJ_TOOLS}:"
eval "${OC_CLEAN_TOOLS}"

# Provide oc command instruction
#
informer "${OC_CLEAN_DEPLOY}" "${OC_CLEAN_TOOLS}"