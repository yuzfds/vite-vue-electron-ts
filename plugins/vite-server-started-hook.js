const viteServerStartedHook = (callback)=>({
    name: 'configure-server',
    configureServer(server){
        callback(server)
    }
    
})


export default viteServerStartedHook
