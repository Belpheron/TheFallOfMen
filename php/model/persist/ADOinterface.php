<?php

interface ADOinterface {
    public function getAll();
    public function get($entity);
    public function insert($entity);
    public function delete($entity);
    public function update($entity);
}
