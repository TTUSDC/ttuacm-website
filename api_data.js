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
    "url": "/api/v2/members",
    "title": "Subscribe to a group",
    "description": "<p>Subscribes a member to a group</p>",
    "version": "0.2.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nmember : {\n   \"email\": String,\n   \"hasPaidDues\": Boolean,\n   \"groups\": String\n}",
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
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>group</p>"
          }
        ]
      }
    },
    "filename": "src/api/members/members.router.js",
    "groupTitle": "Members",
    "name": "DeleteApiV2Members"
  },
  {
    "type": "get",
    "url": "/api/v2/members",
    "title": "Get Members",
    "description": "<p>Gets all of the members in database</p>",
    "version": "0.2.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nmembers : [\n  {\n     \"email\": String,\n     \"hasPaidDues\": Boolean,\n     \"groups\": String[]\n  }\n]",
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
    "filename": "src/api/members/members.router.js",
    "groupTitle": "Members",
    "name": "GetApiV2Members"
  },
  {
    "type": "get",
    "url": "/api/v2/members",
    "title": "Get Member by email",
    "description": "<p>Gets the member of given email in database</p>",
    "version": "0.2.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n members : {\n      \"email\": String,\n      \"hasPaidDues\": Boolean,\n      \"groups\": String[]\n}",
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
    "filename": "src/api/members/members.router.js",
    "groupTitle": "Members",
    "name": "GetApiV2Members"
  },
  {
    "type": "get",
    "url": "/api/v2/members/test",
    "title": "Test Route",
    "description": "<p>Test route to check if the API is properly connected</p>",
    "group": "Members",
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
    "filename": "src/api/members/members.router.js",
    "groupTitle": "Members",
    "name": "GetApiV2MembersTest"
  },
  {
    "type": "put",
    "url": "/api/v2/members",
    "title": "Unsubscribe to a group",
    "description": "<p>Unsubscribes a member to a group</p>",
    "version": "0.2.0",
    "group": "Members",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nmember : {\n   \"email\": String,\n   \"hasPaidDues\": Boolean,\n   \"group\": String\n}",
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
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "group",
            "description": "<p>group</p>"
          }
        ]
      }
    },
    "filename": "src/api/members/members.router.js",
    "groupTitle": "Members",
    "name": "PutApiV2Members"
  }
] });
