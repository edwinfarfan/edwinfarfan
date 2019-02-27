package pe.com.cd.repository.search;

import pe.com.cd.domain.TipoDocumento;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TipoDocumento entity.
 */
public interface TipoDocumentoSearchRepository extends ElasticsearchRepository<TipoDocumento, Long> {
}
