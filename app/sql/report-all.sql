/*
from contents of table: TimeReportItem,
compiles table: totals: 
    sum of amounts earned per employeeId, payPeriod
 */
select employeeId, year, month, dom
from TimeReportItem order by
employeeId, year, month, dom;

drop table if exists calculated;
create table calculated as
select
       employeeId,
       year,
       month,
       dom,
       jobGroup,
       sum(hoursWorked) as total_hours,
       0 as amount,
       case
            when dom <= 15
                then 0
            else 1
            end
            as half
from
     TimeReportItem
group by
    employeeId,
    jobGroup,
    year,
    month,
    half
order by
    employeeId,
    jobGroup,
    year,
    month,
    half
;

update calculated set amount = total_hours * 20 where jobGroup = 'A';
update calculated set amount = total_hours * 30 where jobGroup = 'B';


drop table if exists totals;
create table totals as
select employeeId, year, month, half, sum(amount) from calculated group by employeeId, year, month, half;

select * from totals;