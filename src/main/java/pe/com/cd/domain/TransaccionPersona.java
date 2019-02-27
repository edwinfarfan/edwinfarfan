package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A TransaccionPersona.
 */
@Entity
@Table(name = "transaccion_persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "transaccionpersona")
public class TransaccionPersona implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "monto_a_comprar", precision = 10, scale = 2)
    private BigDecimal montoAComprar;

    @Column(name = "monto_total", precision = 10, scale = 2)
    private BigDecimal montoTotal;

    @Column(name = "estado")
    private String estado;

    @Column(name = "fecha")
    private LocalDate fecha;

    @Column(name = "comentario")
    private String comentario;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Banco bancoOrigen;

    @OneToOne
    @JoinColumn(unique = true)
    private Banco bancoDestino;

    @OneToOne
    @JoinColumn(unique = true)
    private Moneda monedaAComprar;

    @OneToOne
    @JoinColumn(unique = true)
    private TipoCambio tipoCambio;

    @OneToOne
    @JoinColumn(unique = true)
    private DepositoPersona depositoPersona;

    @OneToOne
    @JoinColumn(unique = true)
    private CuentaBancaria cuentaDestinoPersona;

    @OneToOne
    @JoinColumn(unique = true)
    private Moneda monedaMontoTotal;

    @OneToOne
    @JoinColumn(unique = true)
    private DepositoCambista depositoCambista;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontoAComprar() {
        return montoAComprar;
    }

    public TransaccionPersona montoAComprar(BigDecimal montoAComprar) {
        this.montoAComprar = montoAComprar;
        return this;
    }

    public void setMontoAComprar(BigDecimal montoAComprar) {
        this.montoAComprar = montoAComprar;
    }

    public BigDecimal getMontoTotal() {
        return montoTotal;
    }

    public TransaccionPersona montoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
        return this;
    }

    public void setMontoTotal(BigDecimal montoTotal) {
        this.montoTotal = montoTotal;
    }

    public String getEstado() {
        return estado;
    }

    public TransaccionPersona estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public TransaccionPersona fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getComentario() {
        return comentario;
    }

    public TransaccionPersona comentario(String comentario) {
        this.comentario = comentario;
        return this;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public TransaccionPersona usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Banco getBancoOrigen() {
        return bancoOrigen;
    }

    public TransaccionPersona bancoOrigen(Banco banco) {
        this.bancoOrigen = banco;
        return this;
    }

    public void setBancoOrigen(Banco banco) {
        this.bancoOrigen = banco;
    }

    public Banco getBancoDestino() {
        return bancoDestino;
    }

    public TransaccionPersona bancoDestino(Banco banco) {
        this.bancoDestino = banco;
        return this;
    }

    public void setBancoDestino(Banco banco) {
        this.bancoDestino = banco;
    }

    public Moneda getMonedaAComprar() {
        return monedaAComprar;
    }

    public TransaccionPersona monedaAComprar(Moneda moneda) {
        this.monedaAComprar = moneda;
        return this;
    }

    public void setMonedaAComprar(Moneda moneda) {
        this.monedaAComprar = moneda;
    }

    public TipoCambio getTipoCambio() {
        return tipoCambio;
    }

    public TransaccionPersona tipoCambio(TipoCambio tipoCambio) {
        this.tipoCambio = tipoCambio;
        return this;
    }

    public void setTipoCambio(TipoCambio tipoCambio) {
        this.tipoCambio = tipoCambio;
    }

    public DepositoPersona getDepositoPersona() {
        return depositoPersona;
    }

    public TransaccionPersona depositoPersona(DepositoPersona depositoPersona) {
        this.depositoPersona = depositoPersona;
        return this;
    }

    public void setDepositoPersona(DepositoPersona depositoPersona) {
        this.depositoPersona = depositoPersona;
    }

    public CuentaBancaria getCuentaDestinoPersona() {
        return cuentaDestinoPersona;
    }

    public TransaccionPersona cuentaDestinoPersona(CuentaBancaria cuentaBancaria) {
        this.cuentaDestinoPersona = cuentaBancaria;
        return this;
    }

    public void setCuentaDestinoPersona(CuentaBancaria cuentaBancaria) {
        this.cuentaDestinoPersona = cuentaBancaria;
    }

    public Moneda getMonedaMontoTotal() {
        return monedaMontoTotal;
    }

    public TransaccionPersona monedaMontoTotal(Moneda moneda) {
        this.monedaMontoTotal = moneda;
        return this;
    }

    public void setMonedaMontoTotal(Moneda moneda) {
        this.monedaMontoTotal = moneda;
    }

    public DepositoCambista getDepositoCambista() {
        return depositoCambista;
    }

    public TransaccionPersona depositoCambista(DepositoCambista depositoCambista) {
        this.depositoCambista = depositoCambista;
        return this;
    }

    public void setDepositoCambista(DepositoCambista depositoCambista) {
        this.depositoCambista = depositoCambista;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransaccionPersona transaccionPersona = (TransaccionPersona) o;
        if (transaccionPersona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transaccionPersona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransaccionPersona{" +
            "id=" + getId() +
            ", montoAComprar=" + getMontoAComprar() +
            ", montoTotal=" + getMontoTotal() +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", comentario='" + getComentario() + "'" +
            "}";
    }
}
