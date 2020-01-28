export const links = [
    { "name": "", "path": "/", "component": "LoginComponent", "type": "", "action": [] },
    {
        "name": "info",
        "path": "/staff/info",
        "component": "StaffInfoComponent",
        "type": "",
        "action": [
            { "name": "add", "path": "/staff/add" },
            { "name": "edit", "path": "/staff/edit" }
        ]
    },
    { "name": "add", "path": "/staff/add", "component": "StaffAdd", "type": ["add"] },
    { "name": "edit", "path": "/staff/edit", "component": "StaffEdit", "type": "edit", "action": [{ "name": "add", "path": "/staff/add" }] },
    { "name": "filter", "path": "/staff/filter", "component": "FilterFormComponent", "type": "", "action": [{ "name": "add", "path": "/staff/add" }] },
    { "name": "staff", "path": "/staff/filter", "component": "FilterFormComponent", "type": "", "action": [{ "name": "add", "path": "/staff/add" }] },
    { "name": "result", "path": "/staff/result", "component": "FilterResultComponent", "type": "", "action": [{ "name": "add", "path": "/staff/add" }] },
    { "name": "dashboard", "path": "/dashboard", "component": "Chart", "type": "", "action": [] }
]