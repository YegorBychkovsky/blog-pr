import components from '@/components/ui/index';
import directives from '@/directives/index';
import router from '@/router/router';
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(store).use(router).mount('#app');
