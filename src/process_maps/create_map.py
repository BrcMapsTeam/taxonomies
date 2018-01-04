# Note: Script will replace existing taxonomy maps

import urllib, json

listOfTaxonomies = "https://docs.google.com/spreadsheets/d/1_EKu8sGBryuZY9smHMemrRuZ6EvvqoTxsW_tbkS9f74/edit#gid=0";

def createHXLLink(url):
    return "https://proxy.hxlstandard.org/data.json?strip-headers=on&url=" + urllib.quote(url)


response = urllib.urlopen(createHXLLink(listOfTaxonomies))
data = json.loads(response.read())
taxonomies = []
index = 0
                          
for row in data:
    
    # Removes scenario when there is no URL provided
    if index > 0 and len(row[5])>2:
		taxType = row[3]
		taxGroup = row[2]
		taxLevel = row[1]
		urlOnline = row[5]
        name = taxType + "_" + taxGroup + taxLevel

        taxonomies.append({"name": name, "urlOnline": urlOnline, "type": taxType, "group": taxGroup, "level":taxLevel })
    index += 1
                          

for taxonomy in taxonomies:
    
    print "Processing taxonomy: ", taxonomy['name']

    taxonomy['url'] = 'taxonomy_maps/'+taxonomy['name']+'_base.json'
    hxlProxyURL = createHXLLink(taxonomy['urlOnline'])

    try:
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

        with open('../'+taxonomy['url'], 'w') as outfile:
            json.dump(output, outfile)
    except Exception as error:
        print "Error processing the taxonomy: ", taxonomy['name']
        print error
            
            
# Creating/Updating the config.js file


with open('../taxonomy_maps/config.js', 'w') as file:
    file.write("let config_json = \n")
    
with open('../taxonomy_maps/config.js', 'a') as file:
    json.dump(taxonomies, file)
    file.write(";\nexport default config_json;")


    
    
    