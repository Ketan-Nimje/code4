<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;

class Data_model {

    protected $db;

    public function __construct(ConnectionInterface &$db) {
        $this->db = & $db;
    }

    public function Get_data($tbl) {
        $query = $this->db->table($tbl);
        return $query->get()->getResultArray();
    }

    public function Get_data_order($tbl, $tblcol, $type) {
        $this->db->orderBy($tblcol, $type);
        $query = $this->db->table($tbl);
        return $query->get()->getResultArray();
    }

    public function Insert_data($tbl, $data) {
        $this->db->table($tbl)->insert($data);
    }

    public function Insert_batch($tbl, $data) {
        $this->db->table($tbl)->insert_batch($data);
    }

    public function Insert_data_id($tbl, $data) {
        $this->db->table($tbl)->insert($data);
        return $this->db->insertID();
    }

    public function Update_data($tbl, $con, $data) {
        $query = $this->db->table($tbl)->set($data)->where($con)->update();
        return $this->db->affectedRows();
    }

    public function Update_data_id($tbl, $con, $data) {
        $this->db->table($tbl)->set($data)->where($con)->update();
        return $this->db->table($tbl)->getWhere($con)->getRow()->instagram_account_id;
    }

    public function Update_data_escaped($tbl, $con, $data) {
        $this->db->table($tbl)->set($data, FALSE)->where($con)->update();
        return $this->db->affectedRows();
    }

    public function Update_batch($tbl, $data, $con) {
        $this->db->update_batch($tbl, $data, $con);
        return $this->db->affectedRows();
    }

    public function Deleta_data($tbl, $con) {
        $this->db->table($tbl)->where($con)->delete();
        return $this->db->affectedRows();
    }

    public function Get_data_all($tbl, $con) {

        $query = $this->db->table($tbl);
        if (!empty($con)) {
            $query->where($con);
        }
        return $query->get()->getResultArray();
    }

    public function Get_data_all_columns($tbl, $con, $col) {


        $query = $this->db->table($tbl);
        if (!empty($con)) {
            $query->where($con);
        }
        if (!empty($col)) {
            $query->select($col);
        }

        return $query->get()->getResultArray();
    }

    public function Get_data_order_all($tbl, $con, $tblcol, $type) {
        $query = $this->db->table($tbl)->where($con)->orderBy($tblcol, $type);
        return $query->get()->getResultArray();
    }

    public function Get_data_one($tbl, $con) {

        $res = $this->db->table($tbl)->select('*')->where($con)->get()->getResultArray();

        if (count($res) > 0) {
            return $res[0];
        } else {
            return false;
        }
    }

    public function Get_data_one_column($tbl, $con, $col) {

        $query = $this->db->table($tbl)->select($col)->where($con);
        $result = $query->get()->getResultArray();
//        echo $this->db->getLastQuery();
        return ($result) ? $result[0] : [];
    }

    public function Get_data_one_or($tbl, $con) {
        $this->db->or_where($con);
        $res = $this->db->table($tbl);
        if ($res->get()->countAllResults() > 0) {
            $query = $res->get()->getResultArray();
            return $query[0];
        } else {
            return false;
        }
    }

    public function Custome_query($str) {
        $query = $this->db->query($str);
        return $query->getResultArray();
    }

    public function query($str) {
        $query = $this->db->query($str);
        return $query->result();
    }

    public function Get_data_query($tbl, $con) {

        $query = $this->db->table($tbl)->where($con);
        return $query->result();
    }

    public function Custome_query_exe($str) {
        $query = $this->db->query($str);
    }

    public function Custome_query_product_exe($str) {
        $query = $this->db->query($str);
        return $query;
    }

    public function __destruct() {
        $this->db->close();
    }

}

?>