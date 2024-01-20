import React from 'react'
import { AdminLayout } from '../../component/layout/AdminLayout'
import { DashboardSales } from '../../component/dashboard-charts/DashboardSales'
import { CustomCard } from '../../component/custom-card/CustomCard'
import { DashboardVisitor } from '../../component/dashboard-charts/DashboardVisitor'
import { Col, Row } from 'react-bootstrap'

const Dashboard = () => {

  const infos = [
    {
      title: "Sales",
      linkTo: "/order",
      linkText: "All Sales",
      average: "$267,500",
      description: "Average Yearly Sales",
      additionalContent: <DashboardSales />
    },
    {
      title: "Visitor",
      linkTo: "/customer",
      linkText: "All Visitor",
      average: "1.245",
      description: "Web Visitor",
      additionalContent: <DashboardVisitor />
    },
    {
      title: "Visitor",
      linkTo: "/customer",
      linkText: "All Visitor",
      average: "1.245",
      description: "Web Visitor",
      additionalContent: <DashboardVisitor />
    },

  ]

  return <AdminLayout title="Dashboard">
    <p>You can see all the sales analysis results more clearly and completely</p>
    <Row>
      {
        infos.map((item, i) => (
          <Col lg={4} md={6} sm={12} key={i}>
            <CustomCard {...item} />
          </Col>
        ))
      }
    </Row>
  </AdminLayout>
}

export default Dashboard