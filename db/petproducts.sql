-- this is an example query connecting pet names to their product names
SELECT pets.name,
  products.name
FROM pets
INNER JOIN pets_products on pets.id=pets_products.pets_id
INNER JOIN products on pets_products.products_id=products.id;