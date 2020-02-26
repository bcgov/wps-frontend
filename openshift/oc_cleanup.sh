#!/bin/bash
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
#%   PROJ_TOOLS=tools PROJ_DEPLOY=dev ${THIS_FILE} 0 apply
#%

# Halt conditions (errors, unsets, non-zero pipes), field separator and verbosity
#
set -euo pipefail
IFS=$'\n\t'
[ ! "${VERBOSE:-}" == "true" ] || set -x

# Parameters and environment vars
#
PR_NO=${1:-}
APPLY=${2:-}
source "$(dirname ${0})/envars"

# Show help if no params
#
[ "${#}" -gt 0 ] || {
	THIS_FILE="$(dirname ${0})/$(basename ${0})"
	cat ${THIS_FILE} | grep "^#%" | sed -e "s|^#%||g" -e "s|\${THIS_FILE}|${THIS_FILE}|g"
	exit
}

# Verify login
#
$(oc whoami &>/dev/null) || {
	echo "Please verify oc login"
	exit
}

# Set and process commands
#
APP_LABEL="${NAME}-pr-${PR_NO}"
if [ "${APPLY}" == "apply" ]; then
	OC_CLEAN_DEPLOY="oc -n ${PROJ_DEPLOY} delete all -o name -l app=${APP_LABEL}"
	OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} delete all -o name -l app=${APP_LABEL}"
else
	OC_CLEAN_DEPLOY="oc -n ${PROJ_DEPLOY} get all -o name -l app=${APP_LABEL}"
	OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} get all -o name -l app=${APP_LABEL}"
	echo -e "\n*** This only a listing.  Use 'apply' to delete. ***"
fi
echo -e "\n${PROJ_DEPLOY}:"
eval "${OC_CLEAN_DEPLOY}"
echo -e "\n${PROJ_TOOLS}:"
eval "${OC_CLEAN_TOOLS}"

# Echo commands
#
echo -e "\n${OC_CLEAN_DEPLOY}"
echo -e "\n${OC_CLEAN_TOOLS}\n"
