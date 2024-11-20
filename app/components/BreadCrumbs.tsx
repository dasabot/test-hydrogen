import {ProductFragment} from 'storefrontapi.generated';

export function Breadcrumbs({product}: {product: ProductFragment}) {
  const breadcrumbs = (() => {
    const breadcrumbsList: {name: string; href: string}[] = [];

    breadcrumbsList.push({name: 'Home', href: '/'});

    let currentCollection = product.collection?.reference;

    const collectionPath: {name: string; href: string}[] = [];
    while (currentCollection) {
      collectionPath.unshift({
        name: currentCollection.title,
        href: `/collections/${currentCollection.handle}`,
      });
      currentCollection = currentCollection.collection?.reference;
    }

    breadcrumbsList.push(...collectionPath);

    breadcrumbsList.push({
      name: product.title,
      href: `/products/${product.handle}`,
    });

    return breadcrumbsList;
  })();

  return (
    <nav aria-label="Breadcrumb">
      <ul>
        {breadcrumbs.map((crumb, index) => (
          <li className="breadcrumbs-item" key={index}>
            <a className="breadcrumbs-link" href={crumb.href}>
              {crumb.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
