/**
 * Created by castle on 2016/01/21.
 */
function getDateFromTimestamp(Timestamp){
    for(var i = Timestamp.length;i<13;i++){
        Timestamp += '0';
    }
    var date = new Date();
    date.setTime(Timestamp);
    return date.toLocaleDateString()
}