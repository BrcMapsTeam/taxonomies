import urllib, json

taxonomies = [
{"name":"IFRC1_base","url":"https://docs.google.com/spreadsheets/d/1ulGIFJIdwkOcBo2eAaQZ9-35mHY7XE0hrDufnMbL2fA/edit#gid=1068706296"},
{"name":"IFRC2_base","url":"https://docs.google.com/spreadsheets/d/1ulGIFJIdwkOcBo2eAaQZ9-35mHY7XE0hrDufnMbL2fA/edit#gid=20836606"},
{"name":"IFRC3_base","url":"https://docs.google.com/spreadsheets/d/1ulGIFJIdwkOcBo2eAaQZ9-35mHY7XE0hrDufnMbL2fA/edit#gid=491036723"},
{"name":"IFRC4_base","url":"https://docs.google.com/spreadsheets/d/1ulGIFJIdwkOcBo2eAaQZ9-35mHY7XE0hrDufnMbL2fA/edit#gid=1487516888"},
{"name":"Glide_base","url":"https://docs.google.com/spreadsheets/d/1ulGIFJIdwkOcBo2eAaQZ9-35mHY7XE0hrDufnMbL2fA/edit#gid=1971172407"}
]

for taxonomy in taxonomies:
	print taxonomy['name']
	hxlProxyURL = "https://proxy.hxlstandard.org/data.json?strip-headers=on&url="+urllib.quote(taxonomy['url'])

	response = urllib.urlopen(hxlProxyURL)
	data = json.loads(response.read())
	i = 0
	output = {}

	for row in data:

		subTerm = row[1]
		baseTerm = row[2]

		if i>0:
			if subTerm not in output:
				output[subTerm] = [baseTerm]
			else:
				output[subTerm].append(baseTerm)
		i=i+1

	with open('../taxonomy_maps/'+taxonomy['name']+'.json', 'w') as outfile:
		json.dump(output, outfile)