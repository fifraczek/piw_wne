/*  
	DATA IMPORT
*/

filename csvFile url "https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/movies_metadata.csv" termstr=lf;

proc import datafile=csvFile out=metadata replace dbms=csv; run;

filename csvFile url "https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/keywords.csv" termstr=lf;

proc import datafile=csvFile out=keywords replace dbms=csv; run;

filename csvFile url "https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/ratings_small.csv" termstr=lf;

proc import datafile=csvFile out=ratings replace dbms=csv; run;

filename csvFile url "https://raw.githubusercontent.com/fifraczek/piw_wne/master/data/links.csv" termstr=lf;

proc import datafile=csvFile out=links replace dbms=csv; run;

/*  
	DATA PROCESSING
*/

proc means data=ratings;
var rating;
class movieId;
output out=ratingsAvg(drop=_type_ _freq_) mean=rating_avg n=rating_count;
run;

data ratingsAvg (rename= (movieId = id));
set ratingsAvg;
run;

data links (rename= (movieId = id));
set links;
run;

data final;
   set metadata;
   set keywords;
   set links;
   set ratingsAvg;
   keep id title keywords budget genres release_date revenue imdbid rating_avg rating_count;
run;

/*  
	DATA EXPORT TO JSON
*/
proc json out="/folders/myfolders/data.json" pretty;
   export final / nosastags;
run;
