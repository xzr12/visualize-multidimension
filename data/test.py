# coding=utf-8
import json

score = open('Score.dat', 'r').readlines()
business = open('yelp_academic_dataset_business.json', 'r').readlines()
output = open('output.json', 'w')

score_dict = {}
business_dict = {}
for j in score:
	i = json.loads(j)
	sid = i['_id']
	score_dict[sid] = {
		'service': i['service_score'],
        'food': i['food_score'],
        'environment': i['environment_score'],
        'price': i['price_score']
	}

print "score get"

for j in business:
	i = json.loads(j)
	bid = i['business_id']
	if bid in score_dict:
		i['review'] = score_dict[bid]
		s = json.dumps(i)
		output.write(s+'\n')

output.close()
print 'output finish'