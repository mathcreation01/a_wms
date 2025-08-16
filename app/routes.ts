import { type RouteConfig, index, route , layout} from "@react-router/dev/routes";

export default [

    index("routes/root/home.tsx"),
    
    route('register', 'routes/root/register.tsx'),
    layout(
        'routes/loggedin/loggedin-layout.tsx',
        [
            route('dashboard', 'routes/loggedin/dashboard.tsx'),
        ]
    ),
    layout(
        'routes/admin/admin-layout.tsx',
        [
            route('admin/dashboard', 'routes/admin/dashboard.tsx'),
            route('admin/all-users', 'routes/admin/all-users.tsx'),
        ]
    ),
    

] satisfies RouteConfig;