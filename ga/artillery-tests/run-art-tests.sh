for file in *.yml; do artillery run "$file" > "resultados_azure_${file%.yml}.txt"; done
