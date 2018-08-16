/**
 * Created by guy on 8/16/18.
 */


/**
 * Created by guy on 8/16/18.
 */
import _ from 'lodash';

interface Database {
    // Sets the reference to the new given path.
    // @param path - The path.
    // @return - The current database instance.
    ref(path: string): Database
    // Saves the object in the database under the currently set path,
    // assigning it a new unique id i.e. it is saved under "path/new_id/".
    // If the path does not exist, it creates it.
    // @param object - The data to be saved.
    // @return - The new unique id.
    push(obj: Object): string
    // Removes the data under the currently set path.
    remove(): void
    // Retrieves the data from the currently set path and calls the
    // continuation function with the data as a parameter
    // @param continuation - Callback to be called with the data.
    once(continuation: any => any)
}


export default class OfflineDatabase implements Database {
    store = {}; //where data actually gets stored
    path = []; //an array, contains the path string split at '/' to work with lodash

    ref(path: string): Database {
        this.path = path.split('/');
        return this;
    }

    push(obj: Object): string {
        const autoIncrementIndex = this.incrementAndGetId();
        _.set(this.store, this.path.concat([autoIncrementIndex]), obj);
        return autoIncrementIndex;
    }

    /**
     * Handles auto_increment implementation of each path.
     * risk of overflow
     * @returns string returns the next auto_incremented id for the current path
     */
    private incrementAndGetId(): string{
        const auto_increment_key = 'AUTO_INCREMENT_KEY_XXXX'; // supposed to be a unique key! we could use Symbol here as well
        let autoIncrementIndex = _.get(this.store, this.path.concat([auto_increment_key]));
        if(autoIncrementIndex){
            autoIncrementIndex = autoIncrementIndex + 1;
        }
        else{
            autoIncrementIndex = 1; //auto increment starts at 1
        }
        autoIncrementIndex =  "ID" + autoIncrementIndex;
        _.set(this.store, this.path.concat([auto_increment_key]), autoIncrementIndex);
        return autoIncrementIndex;
    }

    remove(): void {
        _.unset(this.store, this.path);
    }

    once(continuation: any) {
        const data = _.get(this.store, this.path);
        continuation(data);
    }
}