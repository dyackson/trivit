import * as sapper from '@sapper/app';
import '../node_modules/bulma/css/bulma.min.css';
import '../node_modules/bulmaswatch/nuclear/bulmaswatch.min.css';
import '../node_modules/mobile-drag-drop/default.css';

sapper.start({
    target: document.querySelector('#sapper')
});
