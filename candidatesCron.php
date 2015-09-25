<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

function httpGet($url) {
    $ch = curl_init();  
 
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
//  curl_setopt($ch,CURLOPT_HEADER, false); 
 
    $output=curl_exec($ch);
 
    curl_close($ch);
    return $output;
}

function getMoreCandidates($url) {
    global $data;

    $new_data = json_decode(httpGet($url));

    $data = array_merge($data, $new_data->results);

    if (!is_null($new_data->next)) {
        getMoreCandidates($new_data->next);
    } else {
        final_success();
    };
}

function cmp($a, $b) {
    return $b->total_contributions - $a->total_contributions;
}



function final_success() {
    global $data;

    usort($data, "cmp");

    $sliced_array = array_slice($data, 0, 25);

    print "<pre>";print_r($sliced_array);print "</pre>";

    $fp = fopen('candidates.json', 'w');
    fwrite($fp, json_encode($sliced_array));
    fclose($fp);

    updateDatabase($sliced_array);
}


$apikey = "5fb0ee006d904354961ae1e83e80011b";

 
$initial_result = json_decode(httpGet("http://realtime.influenceexplorer.com/api//candidates/?apikey=5fb0ee006d904354961ae1e83e80011b&office=P&format=json"));
$total = $initial_result->count;
$next = $initial_result->next;
$data = $initial_result->results;

if ($next !== '') {
    getMoreCandidates($next);
};


function updateDatabase($candidates) {

    $username = "sunlight_usr";
    $password = "!u8yhD4dc*7s";
    $conn = new PDO('mysql:host=stuartdotson.com;dbname=sunlightdb', $username, $password);
    $stmt = $conn->prepare("TRUNCATE TABLE candidates");
    $stmt->execute();
    $stmt = $conn->prepare('INSERT INTO candidates (name, fec_id, party, candidate_url, race_url, ie_url, is_incumbent, cycle, not_seeking_reelection, other_office_sought, other_fec_id, election_year, state, office, office_district, candidate_status, total_expenditures, expenditures_supporting, expenditures_opposing, total_receipts, total_contributions, total_disbursements, cash_on_hand, cash_on_hand_date, outstanding_loans) VALUES (:name, :fec_id, :party, :candidate_url, :race_url, :ie_url, :is_incumbent, :cycle, :not_seeking_reelection, :other_office_sought, :other_fec_id, :election_year, :state, :office, :office_district, :candidate_status, :total_expenditures, :expenditures_supporting, :expenditures_opposing, :total_receipts, :total_contributions, :total_disbursements, :cash_on_hand, :cash_on_hand_date, :outstanding_loans)');

      for ($i=0; $i < count($candidates); $i++) {
        $stmt->bindParam(':name', $candidates[$i]->name);
        $stmt->bindParam(':fec_id', $candidates[$i]->fec_id);
        $stmt->bindParam(':party', $candidates[$i]->party);
        $stmt->bindParam(':candidate_url', $candidates[$i]->candidate_url);
        $stmt->bindParam(':race_url', $candidates[$i]->race_url);
        $stmt->bindParam(':ie_url', $candidates[$i]->ie_url);
        $stmt->bindParam(':is_incumbent', $candidates[$i]->is_incumbent);
        $stmt->bindParam(':cycle', $candidates[$i]->cycle);
        $stmt->bindParam(':not_seeking_reelection', $candidates[$i]->not_seeking_reelection);
        $stmt->bindParam(':other_office_sought', $candidates[$i]->other_office_sought);
        $stmt->bindParam(':other_fec_id', $candidates[$i]->other_fec_id);
        $stmt->bindParam(':election_year', $candidates[$i]->election_year);
        $stmt->bindParam(':state', $candidates[$i]->state);
        $stmt->bindParam(':office', $candidates[$i]->office);
        $stmt->bindParam(':office_district', $candidates[$i]->office_district);
        $stmt->bindParam(':candidate_status', $candidates[$i]->candidate_status);
        $stmt->bindParam(':total_expenditures', $candidates[$i]->total_expenditures);
        $stmt->bindParam(':expenditures_supporting', $candidates[$i]->expenditures_supporting);
        $stmt->bindParam(':expenditures_opposing', $candidates[$i]->expenditures_opposing);
        $stmt->bindParam(':total_receipts', $candidates[$i]->total_receipts);
        $stmt->bindParam(':total_contributions', $candidates[$i]->total_contributions);
        $stmt->bindParam(':total_disbursements', $candidates[$i]->total_disbursements);
        $stmt->bindParam(':cash_on_hand', $candidates[$i]->cash_on_hand);
        $stmt->bindParam(':cash_on_hand_date', $candidates[$i]->cash_on_hand_date);
        $stmt->bindParam(':outstanding_loans', $candidates[$i]->outstanding_loans);
        $stmt->execute();
        print_r($stmt->errorInfo());
      }
}





?>