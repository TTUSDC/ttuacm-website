define({ "api": [
  {
    "type": "get",
    "url": "/api/v2/environment",
    "title": "Get Environment Variables",
    "description": "<p>A Protected route to serve environment variables</p> <p>When the route is called in a production/staging environment, we have to check whether or not the host is either the production or staging host. Otherwise, send over the environment</p>",
    "version": "0.2.0",
    "group": "Environment",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"env\": String,\n   \"maintainance\": Boolean\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/environment/index.js",
    "groupTitle": "Environment",
    "name": "GetApiV2Environment"
  },
  {
    "type": "get",
    "url": "/api/v2/environment/test",
    "title": "Test Route",
    "description": "<p>Test route to check if the API is properly connected</p>",
    "group": "Environment",
    "version": "0.2.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/environment/index.js",
    "groupTitle": "Environment",
    "name": "GetApiV2EnvironmentTest"
  },
  {
    "type": "get",
    "url": "/api/v2/events",
    "title": "Get Events",
    "description": "<p>Gets all the events (formatted) in ACM Google Calendar using an OAuth2 Object</p>",
    "version": "0.2.0",
    "group": "Events",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n   \"allEvents\": {\n      \"day\": `Tuesday`,\n      \"startTime\": `2018-12-24T16:10:22.200Z`,\n      \"endTime\": `2018-12-24T16:10:22.200Z`,\n      \"title\": `Workshop`,\n      \"location\": `Texas Tech`,\n      \"description\": `A Really Awesome Workshop`,\n      \"recurringEvent\": false,\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"err\": Error\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/events/events.router.js",
    "groupTitle": "Events",
    "name": "GetApiV2Events"
  },
  {
    "type": "get",
    "url": "/api/v2/events/test",
    "title": "Test Route",
    "description": "<p>Test route to check if the API is properly connected</p>",
    "group": "Events",
    "version": "0.2.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/events/events.router.js",
    "groupTitle": "Events",
    "name": "GetApiV2EventsTest"
  },
  {
    "type": "delete",
    "url": "/api/members/:user_id",
    "title": "Delete Member",
    "description": "<p>Deletes the member with matching id The ID is the same as the firebase uid</p>",
    "version": "0.3.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nMember",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/members/members.controller.js",
    "groupTitle": "Members",
    "name": "DeleteApiMembersUser_id"
  },
  {
    "type": "get",
    "url": "/api/members?[attributeName=attributeValue]?limit",
    "title": "Get Members",
    "description": "<p>Gets all of the members in database You can pass optional query parametes in the URL as well</p>",
    "version": "0.2.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[Members]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/members/members.controller.js",
    "groupTitle": "Members",
    "name": "GetApiMembersAttributenameAttributevalueLimit"
  },
  {
    "type": "get",
    "url": "/api/members/:user_id",
    "title": "Get Members",
    "description": "<p>Gets the member with the matching id The ID is the same as the firebase uid</p>",
    "version": "0.3.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nMember",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/members/members.controller.js",
    "groupTitle": "Members",
    "name": "GetApiMembersUser_id"
  },
  {
    "type": "post",
    "url": "/api/members/:user_id",
    "title": "Create Member",
    "description": "<p>Creates the member with an id The ID is the same as the firebase uid</p>",
    "version": "0.3.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nMember",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/members/members.controller.js",
    "groupTitle": "Members",
    "name": "PostApiMembersUser_id"
  },
  {
    "type": "delete",
    "url": "/api/sdc/groups/:group_id'",
    "title": "Delete a group by Id",
    "description": "<p>Delete a group by their ID</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  Group\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "DeleteApiSdcGroupsGroup_id"
  },
  {
    "type": "delete",
    "url": "/api/sdc/groups/:group_id/users/:user_id'",
    "title": "Unsubscribe to a group",
    "description": "<p>Unsubscribes a member to a group</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  SdcMember\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "DeleteApiSdcGroupsGroup_idUsersUser_id"
  },
  {
    "type": "get",
    "url": "/api/sdc/groups'",
    "title": "Get All Groups",
    "description": "<p>Gets all the groups</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n[\n  Group\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "GetApiSdcGroups"
  },
  {
    "type": "get",
    "url": "/api/sdc/groups/:group_id'",
    "title": "Get a group by Id",
    "description": "<p>Gets a group by their ID</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  Group\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "GetApiSdcGroupsGroup_id"
  },
  {
    "type": "get",
    "url": "/api/sdc/groups/:group_id/users/:user_id'",
    "title": "Subscribe to a group",
    "description": "<p>Subscribes a member to a group</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  SdcMember\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "GetApiSdcGroupsGroup_idUsersUser_id"
  },
  {
    "type": "post",
    "url": "/api/sdc/groups/:group_id'",
    "title": "Create a group",
    "description": "<p>Creates a new group</p>",
    "version": "0.3.0",
    "group": "SDC",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  Group\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 err.code OK",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>group</p>"
          }
        ]
      }
    },
    "filename": "src/api/sdc/sdc.controller.js",
    "groupTitle": "SDC",
    "name": "PostApiSdcGroupsGroup_id"
  }
] });
