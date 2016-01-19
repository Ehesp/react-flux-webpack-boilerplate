/**
 * A decorator to assist with local storage
 * @param Class
 */

export default function (Class) {
    Object.defineProperties(Class.prototype, {

        'get': {
            value: function(id) {
                let payload;
                try {
                    payload = JSON.parse(localStorage.getItem(id));
                } catch (e) {
                    return localStorage.getItem(id);
                }

                return payload;
            }
        },

        'set': {
            value: function(id, payload) {
                if (typeof payload === 'object') {
                    localStorage.setItem(id, JSON.stringify(payload));
                } else {
                    localStorage.setItem(id, payload);
                }
            }
        },

        'del': {
            value: function(id) {
                return localStorage.removeItem(id);
            }
        }

    });
}
