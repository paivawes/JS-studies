export class SessionFactory {
    constructor(config){
        this.dbName = config.dbName
        this.dbVersion = config.dbVersion
        this.stores = new Map()
        config.mappers.forEach(mapper => {
            this.stores.set(
                mapper.clazz.name,
                mapper.converter
            )
        })
        
    }

    async openSession(){
        const connection = await createConnection(
            this.dbName,
             this.dbVersion,
             this.store
        )

        return new Session(connection, this.stores)
    }
}

class Session {
    constructor(connection, stores) {
        this.connection = connection,
        this.stores = stores
    }

    save(object) {
        return new Promise((resolve, reject) => {
            const storeName = object.constructor.name
            const request = this.connection
                .transaction([storeName], 'readwrite')
                .objectStore(storeName)
                .add(object)
            request.onsuccess = e => resolve()
            request.onerror = e => {
                console.log(e.target.error)
                reject(`Não foi possível persistir o objeto na store ${storeName}`)
            }
        })
    }

}

function createConnection(dbName, dbVersion, stores) {
    return new Promise((resolve, reject) => {

        const request = window.indexedDB.open(dbName, dbVersion)

        request.onupgradeneeded = e => {
            const transactionalConnection = e.target.result
            for(let [key, value] of stores) {
                const store = key

                if(transactionalConnection.objectStoreName.contains(stores)) {
                    transactionalConnection.deleteObjectStore(store)
                }

                transactionalConnection.createdObject(store, {autoIncrement: true})
                
            }
        }

        request.onsuccess = e => {
            const connection = e.target.result
            resolve(connection)
        }

        request.onerror = e => {
            console.log(e.target.error)
            reject(`Não foi possível obter a conexão como o banco ${dbVersion}`)
        }
    })
}