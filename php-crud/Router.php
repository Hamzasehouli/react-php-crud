<?php

namespace app;

class Router
{
    private $getRoutes = [];
    private $postRoutes = [];
    private $updateRoutes = [];
    private $deleteRoutes = [];

    public function get($url, $fn)
    {
        $this->getRoutes[$url] = $fn;

    }
    public function post($url, $fn)
    {
        $this->postRoutes[$url] = $fn;
    }
    public function update($url, $fn)
    {
        $this->updateRoutes[$url] = $fn;
    }
    public function delete($url, $fn)
    {
        $this->deleteRoutes[$url] = $fn;
    }

    public function run()
    {
        $method = $_SERVER['REQUEST_METHOD'];

        $path = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';

        $fn = null;
        if ($method === 'GET') {
            if (isset($this->getRoutes[$path])) {
                $fn = $this->getRoutes[$path];
            }

        }
        if ($method === 'POST') {
            if (isset($this->postRoutes[$path])) {
                $fn = $this->postRoutes[$path];
            }

        }
        if ($method === 'PATCH') {
            if (isset($this->updateRoutes[$path])) {
                $fn = $this->updateRoutes[$path];
            }

        }
        if ($method === 'DELETE') {
            if (isset($this->deleteRoutes[$path])) {
                $fn = $this->deleteRoutes[$path];
            }
        }

        if (!$fn) {
            echo 'No route found with the given route';
            exit;
        } else {
            call_user_func($fn);
        }
    }
}