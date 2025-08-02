import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StringGenerator from '../views/StringGenerator.vue'
import JsonParser from '../views/JsonParser.vue'
import Base64Tool from '../views/Base64Tool.vue'
import UrlTool from '../views/UrlTool.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/string-generator',
    name: 'StringGenerator',
    component: StringGenerator
  },
  {
    path: '/json-parser',
    name: 'JsonParser',
    component: JsonParser
  },
  {
    path: '/base64-tool',
    name: 'Base64Tool',
    component: Base64Tool
  },
  {
    path: '/url-tool',
    name: 'UrlTool',
    component: UrlTool
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router