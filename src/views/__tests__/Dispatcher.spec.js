import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'
import merge from 'lodash.merge'

import Dispatcher from '../Dispatcher'
import WareItem from '../../components/WareItem'
import TrailerItem from '../../components/TrailerItem'

// mock data
import mockTrailers from './mockData/trailers'
import mockWares from './mockData/wares'
import mockWarehouses from './mockData/warehouses'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuetify)

describe('Dispatcher.vue', () => {
  const mockCreateNewMission = jest.fn(() => Promise.resolve({ data: { id: 1 } }))

  function createStore (overrides) {
    const defaultStoreConfig = {
      modules: {
        trailers: {
          namespaced: true,
          state: {
            trailers: mockTrailers,
            selectedTrailerId: null
          },
          actions: {
            fetchTrailers: jest.fn(() => Promise.resolve())
          },
          mutations: {
            setTrailers: jest.fn(),
            setSelectedTrailerId: jest.fn()
          }
        },
        wares: {
          namespaced: true,
          state: {
            wares: mockWares,
            collection: {}
          },
          actions: {
            fetchWares: jest.fn(() => Promise.resolve())
          },
          mutations: {
            clearCollection: jest.fn()
          }
        },
        warehouses: {
          namespaced: true,
          state: {
            warehouses: mockWarehouses
          },
          actions: {
            fetchWarehouses: jest.fn(() => Promise.resolve()),
            fetchWarehouseById: jest.fn(() => Promise.resolve())
          }
        },
        mission: {
          namespaced: true,
          actions: {
            createNewMission: mockCreateNewMission
          }
        }
      }
    }
    return new Vuex.Store(
      merge(defaultStoreConfig, overrides)
    )
  }

  function createWrapper (overrides) {
    const defaultOption = {
      localVue,
      store: createStore(),
      methods: {
        fetchWares: jest.fn(() => Promise.resolve()),
        fetchTrailers: jest.fn(() => Promise.resolve()),
        fetchWarehouses: jest.fn(() => Promise.resolve()),
        createNewMission: mockCreateNewMission,

        setSelectedTrailerId: jest.fn(),
        setMission: jest.fn(),
        clearCollection: jest.fn()
      }
    }

    return shallowMount(Dispatcher, merge(defaultOption, overrides))
  }

  it('renders correct number of wareItem with correct props', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    const wares = wrapper.findAll(WareItem)
    // check the number of rendered wares
    expect(wares).toHaveLength(mockWares.length)
    // check the consistencies of passed props data
    wares.wrappers.forEach((wareWrapper, i) => {
      expect(wareWrapper.props().ware).toEqual(mockWares[i])
    })
  })

  it('does not render the list of trailerItem initially', async () => {
    const wrapper = createWrapper()
    await flushPromises()

    expect(wrapper.find(TrailerItem).exists()).toBeFalsy()
  })

  it('renders trailerItem whos capacity >= totalWeight', async () => {
    const totalWeight = 25
    const expectedTrailers = mockTrailers.filter(trailer => trailer.capacity >= totalWeight)

    const wrapper = createWrapper({
      computed: {
        totalWeight: jest.fn(() => totalWeight)
      }
    })
    await flushPromises()

    const trailerItems = wrapper.findAll(TrailerItem)
    // check the number of rendered trailers
    expect(trailerItems).toHaveLength(expectedTrailers.length)
    // check the consistencies of passed props data
    trailerItems.wrappers.forEach((trailerWrapper, i) => {
      expect(trailerWrapper.props().trailer).toEqual(expectedTrailers[i])
    })
  })

  it('renders route selectors if wares and trailers have both been selected', async () => {
    const store = createStore({
      modules: {
        trailers: {
          state: {
            selectedTrailerId: 1
          }
        }
      }
    })
    const totalWeight = 25

    // does not render route selectors initially
    let wrapper = createWrapper()
    await flushPromises()
    expect(wrapper.find('.routeSelectors').exists()).toBeFalsy()

    // does not render if no ware is selected
    wrapper = createWrapper({ store })
    await flushPromises()
    expect(wrapper.find('.routeSelectors').exists()).toBeFalsy()

    // does not render if no trailer is selected
    wrapper = createWrapper({
      computed: {
        totalWeight: jest.fn(() => totalWeight)
      }
    })
    await flushPromises()
    expect(wrapper.find('.routeSelectors').exists()).toBeFalsy()

    // render if both wares and trailers have been selected
    wrapper = createWrapper({
      store,
      computed: {
        totalWeight: jest.fn(() => totalWeight)
      }
    })
    await flushPromises()
    expect(wrapper.find('.routeSelectors').exists()).toBeTruthy()
  })

  it('saves the mission and redirects to mission page if Submit button is clicked', async () => {
    // mock collection
    const collection = [{
      id: '2',
      name: 'item 2',
      weight: 5,
      quantity: 3
    }]
    // overrides
    const store = createStore({
      modules: {
        trailers: {
          state: {
            selectedTrailerId: 2
          }
        },
        wares: {
          state: {
            collection
          }
        }
      }
    })
    const push = jest.fn()

    const wrapper = createWrapper({
      store,
      data () {
        return {
          srcWarehouse: 1,
          destWarehouse: 2
        }
      },
      computed: {
        totalWeight: jest.fn(() => 25)
      },
      mocks: {
        $router: {
          push
        }
      }
    })
    await flushPromises()

    const submitBtn = wrapper.find('.submitBtn')
    expect(submitBtn.exists()).toBeTruthy()

    submitBtn.vm.$emit('click')
    await flushPromises()

    // test the new mission saved
    expect(mockCreateNewMission).toHaveBeenCalledWith({
      collection,
      trailer: 2,
      route: [1, 2]
    })

    // test the page redirected
    expect(push).toHaveBeenCalledWith({ name: 'mission', params: { missionId: 1 } })
  })
})
