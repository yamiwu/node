- row_number() over(partition by partition_time order by last_modify_time desc) as rn
  -  row_number()从1开始，为每一条分组记录返回一个数字
  - partition by partition_time：先根据partition_time分组
  - order by last_modify_time desc： 根据last_modify_time降序排列 321
  -  再为降序以后的每条xlh记录返回一个序号 







