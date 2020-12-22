import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Header from '../../src/components/Header.vue';

describe('Header.vue', () => {
  let wrapper: Wrapper<Header>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    const router = new VueRouter();

    Vue.use(Vuetify);
    Vue.use(VueRouter);

    wrapper = mount(Header, {
      vuetify,
      router,
      propsData: {
        loggedIn: false
      }
    });
  });

  it('renders correctly when logged out', async () => {
    await wrapper.setProps({ loggedIn: false });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly when logged in', async () => {
    await wrapper.setProps({ loggedIn: true, avatarUrl: 'test-website.com' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly when logging in', async () => {
    await wrapper.setProps({ loggedIn: false, loggingIn: true });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly when logging out', async () => {
    await wrapper.setProps({ loggedIn: true, loggingOut: true });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
