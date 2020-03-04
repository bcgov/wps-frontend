#!/bin/bash
#
source "$(dirname ${0})/common/common"

#%
#% OpenShift DEV-PROD ImageStreamTag Promotion Helper
#%
#%   Promote a passing imagestreamtag from DEV to PROD environments.
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

# Vars
#
SUFFIX_DEV="pr-${PR_NO}"
SUFFIX_PROD="$(echo ${PROJ_PROD} | cut -d'-' -f2)"
ISTAG_PROMOTE="${NAME}:${SUFFIX_DEV}"
ISTAG_IS_PROD="${NAME}:${SUFFIX_PROD}"
SOURCE_IMG="docker-registry.default.svc:5000/${PROJ_TOOLS}/${NAME}-${SUFFIX_DEV}-s2i:latest"

# Commands to import and label imagestreamtag as PROD (SUFFIX_PROD is the after-dash portion of PROJ_PROD)
#
# Check if the tag is available
OC_TAG_VACANT="! oc -n ${PROJ_TOOLS} get istag ${ISTAG_PROMOTE} -o name &>/dev/null"
# Delete that tag
OC_TAG_DELETE="oc -n ${PROJ_TOOLS} delete istag ${ISTAG_PROMOTE}"
# Pipe the first command into the second
OC_TAG_VACATE="${OC_TAG_VACANT} || ${OC_TAG_DELETE}"
#
# Import DEV image into an imagestream in PROD namespace
OC_IMG_IMPORT="oc -n ${PROJ_TOOLS} import-image ${ISTAG_PROMOTE} --from=${SOURCE_IMG}"
# Apply the PROD label to that imagestreamtag
OC_IMG_TAG="oc -n ${PROJ_TOOLS} tag ${ISTAG_PROMOTE} ${ISTAG_IS_PROD}"

# Command to process and promote imagestreamtag to PROD
#
# Process a template (mostly variable substition)
OC_PROCESS="oc -n ${PROJ_TOOLS} process -f ${PATH_DC} -p NAME=${NAME} -p SUFFIX=${SUFFIX_DEV}"
# Apply a template (can use --dry-run)
OC_APPLY="oc -n ${PROJ_PROD} apply -f -"
# Pipe the first command into the second
OC_COMMAND="${OC_PROCESS} | ${OC_APPLY}"

# Process commands
#
if [ "${APPLY}" ]; then
	eval "${OC_TAG_VACATE}"
	eval "${OC_IMG_IMPORT}"
	eval "${OC_IMG_TAG}"
else
	OC_COMMAND+=" --dry-run"
fi
eval "${OC_COMMAND}"

# Provide oc command instruction
#
display_helper "${OC_TAG_VACATE}" "${OC_IMG_IMPORT}" "${OC_IMG_TAG}" "${OC_COMMAND}"