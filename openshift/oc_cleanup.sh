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
#%   Provide a PR number. Defaults to is a dry-run.
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

# Process commands
#
OC_CLEAN_DEPLOY="oc -n ${PROJ_DEPLOY} get all -o name -l app=${NAME}-pr-${PR_NO}"
OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} get all -o name -l app=${NAME}-pr-${PR_NO}"
#
[ "${APPLY}" != "apply" ] || {
	OC_CLEAN_DEPLOY="oc -n ${PROJ_DEPLOY} delete all -o name -l app=${NAME}-pr-${PR_NO}"
	OC_CLEAN_TOOLS="oc -n ${PROJ_TOOLS} delete all -o name -l app=${NAME}-pr-${PR_NO}"
}
eval "${OC_CLEAN_DEPLOY}"
eval "${OC_CLEAN_TOOLS}"

# Echo command
#
echo -e "\n${OC_CLEAN_DEPLOY}\n"
echo -e "\n${OC_CLEAN_TOOLS}\n"
